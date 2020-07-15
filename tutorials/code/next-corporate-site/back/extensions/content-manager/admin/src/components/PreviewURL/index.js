/**
 *
 * PreviewURL
 *
 */

import React from 'react';
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { get } from "lodash";
import { LiLink } from 'strapi-helper-plugin';
import useDataManager from "../../hooks/useDataManager";
import ViewIcon from './view.svg';

const StyledExternalLink = styled.a`
  display: block;
  color: #333740;
  width: 100%;
  text-decoration: none;
  span,
  i,
  svg {
    color: #333740;
    width: 13px;
    height: 13px;
    margin-right: 10px;
    vertical-align: 0;
  }
  span {
    font-size: 13px;
  }
  i {
    display: inline-block;
    background-image: url(${ViewIcon});
    background-size: contain;
  }
  &:hover {
    text-decoration: none;
    span,
    i,
    svg {
      color: #007eff;
    }
  }
`

function PreviewURL() {
  // Check if preview link should be included
  const { modifiedData, slug } = useDataManager();
  console.log({ modifiedData, slug });
  const url = useRouteMatch(
    "/plugins/content-manager/:collectionType/:slug/:id"
  );
  const id = get(url, "params.id", null);

  if (slug !== "application::page.page" || id === "create") {
    return null;
  }
  // Build the right preview URL based on the page status
  let previewURL
  if (modifiedData.status === 'draft') {
    // Secret Next.js preview URL
    previewURL = `${FRONTEND_URL}/api/preview?secret=${FRONTEND_PREVIEW_SECRET}&slug=${modifiedData.slug}`;
  } else {
    // Live public URL
    previewURL = `${FRONTEND_URL}/${modifiedData.slug.replace('__', '/')}`;
  }

  return (
    <li>
      <StyledExternalLink
        href={previewURL}
        target="_blank"
        rel="noopener noreferrer"
        title="page preview"
      >
        <i />
        View page preview
      </StyledExternalLink>
    </li>
  );
}

export default PreviewURL;