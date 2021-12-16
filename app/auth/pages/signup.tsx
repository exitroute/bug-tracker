import { useRouter, BlitzPage, Routes } from "blitz"
import * as React from "react"

import AuthLayout from "app/core/layouts/AuthLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <AuthLayout title="Sign Up">{page}</AuthLayout>

export default SignupPage
