import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CloseIcon from '@mui/icons-material/Close'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import clsx from 'clsx'
import useSWR, { mutate } from 'swr'
import NoAnnotations from '../atoms/NoAnnotations'
import TextStyle from '../atoms/TextStyle'
import Annotation from '../molecules/annotation'

const useStyles = makeStyles((theme) => ({
  sidelist: {
    width: '100%',
    height: 'calc(100vh - 310px)',
    position: 'fixed',
    right: 0,
    bottom: 0,
    border: '1px solid #D8D8D8',
    backgroundColor: theme.palette.common.white,
    overflowY: 'scroll',
    paddingBottom: theme.spacing(2),
    zIndex: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: '0 0 0 99999px rgba(0, 0, 0, .5)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 400px)',
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: 0,
      width: '341px',
      height: 'calc(100vh - 72px)',
      top: '72px',
      boxShadow: 'none',
    },
  },
  sidelistHeader: {
    backgroundColor: theme.palette.grey.extraLight,
  },
  title: {
    lineHeight: '24px',
    letterSpacing: '0.15px',
    fontWeight: 700,
  },
  popoverHolder: {
    minWidth: '190px',
    height: '71px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '8px',
  },
  popoverBtn: {
    margin: theme.spacing(1),
    width: 75,
    height: 56,
    borderRadius: '7px',
    boxShadow: 'none',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.background.main,
    '&:hover, &:active': {
      backgroundColor: theme.palette.hover.main,
      color: theme.palette.common.white,
    },
    '& span': {
      display: 'block',
    },
  },
  buttonHolder: {
    minWidth: 130,
    height: '65px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100px',
    position: 'fixed',
    right: 32,
    bottom: 32,
  },
  button: {
    margin: theme.spacing(1),
    width: 130,
    height: 48,
    borderRadius: '100px',
    boxShadow: 'none',
  },
  active: {
    backgroundColor: '#BAD7FB',
    color: theme.palette.primary.main,
  },
  badge: {
    marginLeft: theme.spacing(2),
    '& span': {
      width: 24,
      height: 24,
      backgroundColor: '#134C3B',
    },
  },
}))

export default function Annotator({
  userId,
  contentId,
  contentTitle,
  contentImgSrc,
  contentSlug,
  updateSidebar,
  domId,
  disabled = false,
  reload,
  refresherKey,
}) {
  if (!userId) {
    return null
  }

  const [state, setState] = useState({
    sidebar: false,
  })

  const [mousePosition, setMousePosition] = useState({
    clientX: null,
    clientY: null,
  })

  const [newAnnotation, setNewAnnotation] = useState(null)
  const [activeAnnotation, setActiveAnnotation] = useState(null) // current note being viewed on sidebar
  const [anchorEl, setAnchorEl] = useState(null)
  const [holdOff, setHoldOff] = useState(false) // if true, do not call prepareArticleBody in useEffect with refresherKey trigger
  const [selection, setSelection] = useState({
    range: null,
    highlightedText: '',
  })

  const { sidebar } = state

  const fetcher = (url) => axios.get(url).then((res) => res.data)

  const { data: deleteActions } = useSWR(
    `/api/get-deleteactions-by-contentid?userId=${userId}&contentId=${contentId}`,
    fetcher
  )

  const { data: annotations } = useSWR(
    `/api/get-annotations-by-contentid?userId=${userId}&contentId=${contentId}`,
    fetcher
  )

  const classes = useStyles()

  let key = 0
  let allNodesCount = 0

  useEffect(() => {
    // Highlight article
    if (annotations && deleteActions) {
      reload()
      // only call prepareArticleBody after the article is freshly rendered
      // esp concerns cases when notes are deleted from the dashboard
    }

    if (typeof window !== 'undefined') {
      // Start highlight listener
      window.addEventListener('keydown', handleHighlightAction)
      window.addEventListener('mouseup', handleHighlightAction)
      window.addEventListener('click', handleClickAction)
      window.addEventListener('touchend', handleHighlightAction)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleHighlightAction)
        window.removeEventListener('mouseup', handleHighlightAction)
        window.removeEventListener('click', handleClickAction)
        window.removeEventListener('touchend', handleHighlightAction)
      }
    }
  }, [annotations, deleteActions])

  useEffect(() => {
    if (annotations && !holdOff) {
      prepareArticleBody()
    } else {
      setHoldOff(false)
    }
  }, [refresherKey])

  const updateData = () => {
    mutate(
      `/api/get-annotations-by-contentid?userId=${userId}&contentId=${contentId}`
    )
    mutate(`/api/get-annotations-by-userid?userId=${userId}`)
  }

  const prepareArticleBody = () => {
    key = 0
    allNodesCount = 0
    // First, add keys to the article body
    const node = document.getElementById(domId)

    if (node) {
      allNodesCount =
        node.getElementsByTagName('*').length -
        node.getElementsByTagName('mark').length

      addKey(node, () => applyExistingHighlights())
    }
  }

  const addKey = (element, callback) => {
    if (key < allNodesCount) {
      if (element.children.length > 0) {
        Array.prototype.forEach.call(element.children, function (each, i) {
          each.dataset.key = key++
          addKey(each, () => applyExistingHighlights())
        })
      }
    } else {
      callback()
    }
  }

  /** Apply highlights from DB */
  const applyExistingHighlights = () => {
    let notesCounter = 0

    annotations.map((annotation) => {
      const range = objToRange(annotation)

      if (range) {
        const mark = markTag(annotation)

        mark.appendChild(range.extractContents())
        range.insertNode(mark)

        if (!annotation.deletedAt && annotation.notes) {
          notesCounter++
          mark.insertBefore(
            numberBall(annotation.id, notesCounter, false),
            mark.childNodes[0]
          )
        }
      }

      // check if a delete action needs to be performed after this annotation
      const deleted = deleteActions?.filter(
        (action) => action.precedingAnnotationId == annotation.id
      )

      if (deleted && deleted.length > 0) {
        deleted.forEach((item) => {
          performDeleteAction(item.deletedAnnotationId)
        })
      }
    })
  }

  const performDeleteAction = (annotation_id) => {
    const toDelete = document.querySelector(
      '[annotation-id="' + annotation_id + '"]'
    )

    if (toDelete) toDelete.outerHTML = toDelete.innerHTML
  }

  const objToRange = (rangeObj) => {
    const range = document.createRange()

    try {
      range.setStart(
        document.querySelector('[data-key="' + rangeObj.startKey + '"]')
          .childNodes[rangeObj.startTextIndex],
        rangeObj.startOffset
      )

      range.setEnd(
        document.querySelector('[data-key="' + rangeObj.endKey + '"]')
          .childNodes[rangeObj.endTextIndex],
        rangeObj.endOffset
      )
      return range
    } catch (e) {
      return null
    }
  }

  const rangeToObj = (range) => {
    return {
      startKey: range.startContainer.parentNode.dataset.key,
      endKey: range.endContainer.parentNode.dataset.key,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      startTextIndex: Array.prototype.indexOf.call(
        range.startContainer.parentNode.childNodes,
        range.startContainer
      ),
      endTextIndex: Array.prototype.indexOf.call(
        range.endContainer.parentNode.childNodes,
        range.endContainer
      ),
    }
  }

  const deleteAnnotation = async (id) => {
    try {
      setAnchorEl(null)
      const res = await fetch(`/api/delete-annotation?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          contentId,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      setHoldOff(true)
      reload()

      mutate(
        `/api/get-deleteactions-by-contentid?userId=${userId}&contentId=${contentId}`
      )

      updateData()
    } catch (e) {
      throw Error(e.message)
    }
  }

  const editAnnotation = async (id, notes) => {
    try {
      const res = await fetch(`/api/edit-annotation?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          userId,
          notes,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      setHoldOff(true)
      reload()

      updateData()
      setNewAnnotation(null)
    } catch (e) {
      throw Error(e.message)
    }
  }

  const addAnnotation = async (notes, newEntry) => {
    try {
      const res = await fetch('/api/create-annotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          contentId,
          contentTitle,
          contentImgSrc: contentImgSrc ? contentImgSrc : null,
          contentSlug,
          notes,
          ...newEntry,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      setHoldOff(true)
      reload()

      updateData()
      setNewAnnotation(null)

      return
    } catch (e) {
      throw Error(e.message)
    }
  }

  const toggleAnnotate = () => {
    const newVal = !sidebar

    setState({ ...state, sidebar: newVal })
    updateSidebar(newVal)
    // setActiveAnnotation(null)
  }

  const handleHighlightAction = (e) => {
    // Check if clicked area is not annotations sidebar, clear highlights
    const targetNode = e.target
    const sidebar = document.getElementById('annotations-sidebar')
    const btn = document.getElementById('annotation-button')
    const actionBtns = document.getElementById('action-buttons')

    if (
      (!sidebar || (sidebar && !sidebar.contains(targetNode))) &&
      targetNode.parentNode !== btn &&
      targetNode.parentNode !== actionBtns
    ) {
      setNewAnnotation(null)
      // reload()
      // removeTemporaryHighlights()
    } else {
      return null
    }

    const node = document.getElementById(domId)
    const highlightedText = document.getSelection()

    if (
      !node ||
      highlightedText.isCollapsed ||
      !highlightedText.anchorNode ||
      !node.contains(highlightedText.anchorNode) ||
      !highlightedText.rangeCount > 0
    ) {
      return null
    }

    const range = highlightedText.getRangeAt(0)
    const htString = highlightedText.toString()

    // get the selected document fragment as a string
    const fragment = range.cloneContents()
    const div = document.createElement('div')
    div.appendChild(fragment.cloneNode(true))

    // only highlight if not spanning more than 1 paragraph
    // or overlapping <i> <em> <strong> etc
    if (
      fragment.querySelector('p') ||
      div.innerHTML.startsWith('<') ||
      div.innerHTML.endsWith('>')
    ) {
      return null
    }

    // Empty activeAnnotation state
    setActiveAnnotation(null)

    setSelection({
      range: range,
      highlightedText: htString,
    })
    /** FF Fix */

    // Popup buttons
    setAnchorEl(e.target)
    setMousePosition({ clientX: e.clientX, clientY: e.clientY })
  }

  const handleClickAction = (e) => {
    // detect if the click is on a highlighted text
    const nodeClicked = e.target

    if (
      nodeClicked.hasAttribute('highlight') ||
      nodeClicked.parentNode?.hasAttribute('highlight')
    ) {
      if (nodeClicked.hasAttribute('annotation')) {
        const annotation_id = nodeClicked.getAttribute('annotation-id')
        setActiveAnnotation(annotation_id)

        // programmatically click the annotations button (if closed) to bring up the sidebar
        const sidebar = document.getElementById('annotations-sidebar')
        const annotationBtn = document.getElementById('annotation-button')
        if (!sidebar) {
          annotationBtn.click()
        }
        const annotationBox = document.getElementById(
          `annotation-sidelist-${annotation_id}`
        )
        annotationBox?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // a highlighted (not annotated) text is clicked
        setAnchorEl(
          nodeClicked.hasAttribute('highlight')
            ? nodeClicked
            : nodeClicked.parentNode
        )
        setMousePosition({ clientX: e.clientX, clientY: e.clientY })
      }
    }
  }

  const markTag = (annotation = null) => {
    const mark = document.createElement('mark')
    mark.style.cursor = 'pointer'
    mark.setAttribute('highlight', '')
    mark.style.background =
      'linear-gradient(to right, transparent 25px, #8DD1C1 10px)'

    if (annotation) {
      mark.setAttribute('annotation-id', annotation.id)
      if (annotation.deletedAt) {
        mark.removeAttribute('highlight')
        mark.style.cursor = 'auto'
        mark.style.background = 'transparent'
      } else {
        if (annotation.notes) {
          mark.setAttribute('annotation', '')
          mark.style.background =
            'linear-gradient(to right, transparent 25px, rgba(141, 209, 193, 0.6) 10px)'
        } else {
          mark.style.background = 'none'
          mark.style.backgroundColor = 'rgba(255, 235, 131, 0.6)'
        }
        mark.id = `annotation-line-${annotation.id}`
      }
    } else {
      mark.setAttribute('temporary', '')
    }

    return mark
  }

  const makeNewAnnotation = () => {
    // programmatically click the annotations button (if closed) to bring up the sidebar
    const sidebar = document.getElementById('annotations-sidebar')
    const annotationBtn = document.getElementById('annotation-button')
    if (!sidebar) {
      annotationBtn.click()
    }

    const nextNumber =
      annotations.filter((a) => a.notes && !a.deletedAt).length + 1

    if (anchorEl.hasAttribute('highlight')) {
      // this is a highlighted text to be annotated
      const item = annotations.find(
        (annotation) => annotation.id == anchorEl.getAttribute('annotation-id')
      )

      // build add annotation object
      const add = {
        id: item.id,
        number: nextNumber,
        highlightedText: item.highlightedText,
        startKey: item.startKey,
        endKey: item.endKey,
        startOffset: item.startOffset,
        endOffset: item.endOffset,
        startTextIndex: item.startTextIndex,
        startEndIndex: item.startEndIndex,
        date: new Date(),
        isUpdate: true,
      }

      setNewAnnotation(add)

      const button = numberBall(null, nextNumber, true)
      anchorEl.insertBefore(button, anchorEl.childNodes[0])

      //on save, do edit instead of add
    } else {
      const { range, highlightedText } = selection

      // only highlight if not spanning more than 1 paragraph
      if (!range.cloneContents().querySelector('p')) {
        const objRange = rangeToObj(range)

        // Add new annotation component
        const add = {
          number: nextNumber,
          highlightedText: highlightedText,
          ...objRange,
          date: new Date(),
        }

        setNewAnnotation(add)

        // important: add number only after setting state
        const button = numberBall(null, nextNumber, true)

        //highlight
        const mark = markTag()
        mark.appendChild(button)
        mark.appendChild(range.extractContents())
        range.insertNode(mark)
      }
    }

    // hide popover buttons
    setAnchorEl(null)
  }

  const saveHighlight = () => {
    // hide popover buttons
    setAnchorEl(null)

    const { highlightedText, range } = selection

    const objRange = rangeToObj(range)

    // only highlight if not spanning more than 1 paragraph
    if (!range.cloneContents().querySelector('p')) {
      const highlight = {
        highlightedText: highlightedText,
        ...objRange,
      }

      addAnnotation(null, highlight)
    }
  }

  const cancelAnnotate = () => {
    setNewAnnotation(null)
    setSelection({
      range: null,
      highlightedText: '',
    })
    reload()
  }

  const numberBall = (id, number, temporary = false) => {
    const span = document.createElement('span')
    span.style.display = 'inline-block'
    span.style.margin = '2px'
    span.style.color = 'white'
    span.style.width = '22px'
    span.style.height = '22px'
    span.style.borderRadius = '11px'
    span.style.backgroundColor = '#005E47'
    span.style.textAlign = 'center'
    span.style.padding = 0
    span.style.border = 0
    span.style.cursor = 'pointer'
    span.style.lineHeight = '1.4rem'
    span.style.fontFamily = 'Poppins'
    span.innerText = number
    span.setAttribute('highlight', '')
    span.setAttribute('annotation', '')

    if (id) span.setAttribute('annotation-id', id)

    if (temporary) span.setAttribute('temporary', '')

    return span
  }

  const viewArticleAnnotation = (id) => {
    const markedLine = document.getElementById(`annotation-line-${id}`)
    if (markedLine) {
      markedLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const notes = annotations?.filter((item) => item.notes && !item.deletedAt)

  return (
    <>
      {!sidebar ? (
        <Box
          className={classes.buttonHolder}
          display='flex'
          justifyContent='center'
        >
          <Button
            id='annotation-button'
            variant='contained'
            color='primary'
            size='large'
            className={clsx(classes.button, {
              [classes.active]: sidebar,
            })}
            startIcon={<FormatQuoteIcon />}
            onClick={() => toggleAnnotate()}
          >
            Notes{' '}
            <Badge
              color='primary'
              badgeContent={notes?.length}
              className={classes.badge}
            />
          </Button>
        </Box>
      ) : (
        <Box id='annotations-sidebar' className={classes.sidelist}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            py={1}
            px={2}
            className={classes.sidelistHeader}
          >
            <Box display='flex' alignItems='center'>
              <IconButton
                aria-label='Close annotations'
                onClick={() => toggleAnnotate()}
                size='large'
              >
                <CloseIcon fontSize='small' />
              </IconButton>
              <Typography className={classes.title}>Notes</Typography>
            </Box>
            {notes && notes.length > 0 && (
              <Box>
                <TextStyle variant='h7'>
                  {notes.length} &nbsp;
                  {notes.length > 1 ? 'Notes' : 'Note'}
                </TextStyle>
              </Box>
            )}
          </Box>
          <Divider />

          {newAnnotation && newAnnotation.highlightedText && (
            <Box m={2}>
              <Annotation
                {...newAnnotation}
                saveAction={(note) =>
                  newAnnotation.id
                    ? editAnnotation(newAnnotation.id, note)
                    : addAnnotation(note, newAnnotation)
                }
                cancelAction={() => cancelAnnotate()}
              />
            </Box>
          )}

          {notes &&
            notes.length > 0 &&
            notes.map((annotation, key) => {
              return (
                <Box
                  m={2}
                  key={key}
                  id={`annotation-sidelist-${annotation.id}`}
                >
                  <Annotation
                    number={key + 1}
                    date={annotation.updatedAt}
                    {...annotation}
                    active={annotation.id == activeAnnotation}
                    updateAction={(id, note) => editAnnotation(id, note)}
                    deleteAction={(id) => deleteAnnotation(id)}
                    viewAction={(id) => viewArticleAnnotation(id)}
                    cancelAction={() => cancelAnnotate()}
                  />
                </Box>
              )
            })}

          {!notes || (notes && notes.length == 0 && !newAnnotation) ? (
            <NoAnnotations message='Use the tool bar or start by highlighting some text.' />
          ) : null}
        </Box>
      )}

      <Popover
        id={activeAnnotation}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorReference='anchorPosition'
        anchorPosition={{
          top: mousePosition.clientY + 15,
          left: mousePosition.clientX,
        }}
        PaperProps={{ style: { borderRadius: 8 } }}
      >
        <Box
          id='action-buttons'
          display='flex'
          justifyContent='center'
          className={classes.popoverHolder}
        >
          {anchorEl && anchorEl.hasAttribute('highlight') && (
            <IconButton
              id='popover-btn-annotate'
              size='small'
              className={classes.popoverBtn}
              onClick={() =>
                deleteAnnotation(anchorEl.getAttribute('annotation-id'))
              }
              disableRipple
            >
              <FormatQuoteIcon />
              <TextStyle variant='caption'>Remove</TextStyle>
            </IconButton>
          )}
          <IconButton
            id='popover-btn-annotate'
            size='small'
            className={classes.popoverBtn}
            onClick={() => makeNewAnnotation()}
            disableRipple
          >
            <FormatQuoteIcon />
            <TextStyle variant='caption'>Add Note</TextStyle>
          </IconButton>

          {anchorEl && !anchorEl.hasAttribute('highlight') && (
            <IconButton
              id='popover-btn-highlight'
              size='small'
              className={classes.popoverBtn}
              onClick={() => saveHighlight()}
              disableRipple
            >
              <BorderColorIcon />
              <TextStyle variant='caption'>Highlight</TextStyle>
            </IconButton>
          )}
        </Box>
      </Popover>
    </>
  )
}
