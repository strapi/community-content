import * as React from 'react'
import Seo from './Seo'
import Header from './Header'
import { Global, css } from '@emotion/core'
import normalize from '../styles/normalize'
import main from '../styles/main'

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <Seo />
    <Global styles={() => css(normalize, main)} />
    <Header />
    <main>{children}</main>
  </>
)

export default LayoutRoot
