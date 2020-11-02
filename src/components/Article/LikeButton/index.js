import React, { useState, useEffect } from 'react'
import { string, number, func } from 'prop-types'

import { Container, Icon } from './LikeButton.module.css'
import Heart from './heart.svg'
import FilledHeart from './filledHeart.svg'

function LikeButton({
  clickId,
  limit,
  onClick,
  className,
  id,
  ...props
}) {
  const [userLikes, setUserLikes] = useState(0)
  const [animate, setAnimate] = useState(0)
  const [count, setCount] = useState(NaN)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    async function getLikes() {
      const url = `/.netlify/functions/get-likes?id=${id}&userId=${userId}`
      const res = await fetch(url)
      const data = await res.json()
      setCount(data.total - data.fromUser)
      setUserLikes(data.fromUser)
    }

    if (id && userId) {
      getLikes()
    }
  }, [id, userId])

  useEffect(() => {
    const userStorage = localStorage.getItem('userId')
    if (userStorage) {
      setUserId(userStorage)
    } else {
      const id = Math.random().toString(36).substr(2, 9)
      localStorage.setItem('userId', id)
      setUserId(id)
    }
  }, [])

  function sendLike(value) {
    return fetch('/.netlify/functions/post-likes',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, userId, count: value }),
      }
    )
  }

  return !isNaN(count) && (<button
    animate={animate}
    onAnimationEnd={() => setAnimate(0)}
    onClick={() => {
      if (userLikes < limit && animate === 0) {
        setAnimate(1)
        setUserLikes(userLikes + 1)
        sendLike(userLikes + 1)
      }
      if (userLikes >= limit) {
        setAnimate(2)
      }
      onClick(userLikes)
    }}
    className={`${Container} ${className}`}
    {...props}
    >
      {userLikes
        ? <FilledHeart className={Icon} />
        : <Heart className={Icon} />
      }
      <span>{count + userLikes}</span>
  </button>)
}

LikeButton.propTypes = {
  clickId: string,
  limit: number,
  onClick: func,
  className: string,
  id: string,
}

LikeButton.defaultProps = {
  clickId: 'like',
  limit: Infinity,
  onClick: () => {},
  className: '',
  id: '',
}

export default LikeButton
