import { useEffect } from "react"
import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, getSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const LandingPage: BlitzPage = () => {
  return (
    <div className="container">
      <h1>Bug Tracker</h1>
      <p>An ExitRoute Project by Ryan O&apos;Shea</p>
      <Link href={Routes.SignupPage()}>
        <a className="button small">
          <strong>Sign Up</strong>
        </a>
      </Link>
      <br />
      <Link href={Routes.LoginPage()}>
        <a className="button small">
          <strong>Login</strong>
        </a>
      </Link>
    </div>
  )
}

LandingPage.suppressFirstRenderFlicker = true
LandingPage.redirectAuthenticatedTo = "/home"

export default LandingPage
