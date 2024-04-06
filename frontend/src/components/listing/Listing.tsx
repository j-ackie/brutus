import React from 'react'
import { useState, useEffect } from "react";
import { Label, RegText, SubHeading, Heading } from "../../global/Text";

const Listing = ( {...props} ) => {
  const user = props.user
  const description = props.description
  const have = props.have
  const want = props.want
  const tags = props.tags
  const created_at = props.created_at

  return (
    <div className="card m-4">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.thumbnail_url} alt={props.title} className="img-fluid rounded-start"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="card-title"> {props.title} </div>
              <div className="card-text">
                <div>
                  <Label text="Posted by:"></Label>
                  <RegText text={user}></RegText>
                </div>
                <div>
                  <Label text="Description:"></Label>
                  <RegText text={description}></RegText>
                </div>
                <div>
                  <Label text="Have:"></Label>
                  <RegText text={have}></RegText>
                </div>
                <div>
                  <Label text="Want:"></Label>
                  <RegText text={want}></RegText>
                </div>
                <div>
                  <Label text="Tags:"></Label>
                  <RegText text={tags}></RegText>
                </div>
                <div>
                  <Label text="Created at:"></Label>
                  <RegText text={created_at}></RegText>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing;