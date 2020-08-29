import React, { useState, useEffect } from 'react'
import { string, number, func } from 'prop-types'

import { Container, Icon } from './LikeButton.module.css'
import Heart from './heart.svg'
import FilledHeart from './filledHeart.svg'

function LikeButton({ clickId, limit, count, onClick, className, ...props }) {
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
    className={`${Container} ${className}`}
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
  className: string,
}

LikeButton.defaultProps = {
  clickId: 'like',
  limit: Infinity,
  count: 0,
  onClick: () => {},
  className: '',
}

export default LikeButton
