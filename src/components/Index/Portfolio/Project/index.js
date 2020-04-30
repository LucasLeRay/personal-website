import React from "react";

import {
  Container,
  Reverse,
  DescriptionBlock,
  ImageBlock,
  Date,
  LinksWrapper,
  Text
} from "./Project.module.css";

const classNames = array => array.filter(Boolean).join(" ");

function Project({ title, date, image, children, reverse, links }) {
  return (
    <div className={classNames([Container, reverse ? Reverse : ""])}>
      <div className={ImageBlock}>
        <img src={image} alt={title} />
      </div>
      <div className={DescriptionBlock}>
        <h3>{title}</h3>
        <span className={Date}>{date}</span>
        <div className={Text}>{children}</div>
        {links && (
          <div className={LinksWrapper}>
            {links.map((link, index) => (
              <span key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
