// src/Content.tsx
import { Container, Spinner } from 'react-bootstrap'
import {
  HashRouter as Router, Navigate,
  Route,
  Routes
} from 'react-router-dom'
import {ReactNode, Suspense} from 'react'
import {AuthLayout, BlankLayout, PrivateLayout} from "../../layouts";
import NotFound404 from "../../components/NotFound404.tsx";
import pages from "./pages.tsx";

const PageLoader = () => (
  <Container className="p-4 text-center" fluid>
    <Spinner animation="border" size="sm" />
  </Container>
)

export default function Content() {
  return (
    <Router>
      <Routes>
        <Route path={pages[0].path} element={(<AuthLayout />) as ReactNode}>
          {(pages[0].routes.map(({ path, element, index }) => (
            <Route
              key={path || 'index'}
              path={path}
              element={(<Suspense fallback={(<PageLoader/> as ReactNode)}>{element}</Suspense> as ReactNode)}
            />
          ))) as ReactNode}
        </Route>
        
        <Route path={pages[1].path} element={(<PrivateLayout/> as ReactNode)}>
          {(pages[1].routes.map(({ path, element, index }) =>
            <Route
              key={index}
              path={path}
              element={(<Suspense fallback={(<PageLoader/>) as ReactNode}>{element}</Suspense>) as ReactNode}
            />)) as ReactNode}
        </Route>
        
        <Route path='/' element={(<BlankLayout/> as ReactNode)}>
          <Route index  path='' element={(<Navigate to='/login' replace /> as ReactNode)} />
        </Route>
        
        <Route path='*' element={(<NotFound404/> as ReactNode)} />
      </Routes>
    </Router>
  )
}
