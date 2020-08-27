import React, { useState, useEffect } from 'react'
import { string, number, func } from 'prop-types'

import { Container, Icon } from './LikeButton.module.css'
import { ReactComponent as Heart } from './heart.svg'
import { ReactComponent as FilledHeart } from './filledHeart.svg'

function LikeButton({ clickId, limit, count, onClick, ...props }) {
  const [clicked, setClicked] = useState(Number(localStorage.getItem(clickId)) || 0)
  const [animate, setAnimate] = useState(0)

  useEffect(() => {
    return localStorage.setItem(clickId, clicked)
  }, [clickId, clicked])

  return (<button
    animate={animate}
    onAnimationEnd={() => setAnimate(0)}
    onClick={() => {
      if (clicked < limit && animate === 0) setClicked(clicked + 1)
      setAnimate(1)
      onClick(clicked)
    }}
    className={Container}
    {...props}
    >
      {clicked ? <FilledHeart className={Icon} /> : <Heart className={Icon} />}
      <span>{count + clicked}</span>
  </button>)
}

LikeButton.propTypes = {
  clickId: string,
  limit: number,
  count: number,
  onClick: func,
}

LikeButton.defaultProps = {
  clickId: 'like',
  limit: Infinity,
  count: 0,
  onClick: () => {}
}

export default LikeButton
