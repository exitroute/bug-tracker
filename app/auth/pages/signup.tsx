import { useRouter, BlitzPage, Routes } from "blitz"
import * as React from "react"

import { SignUpLayout } from "app/core/components/AuthFormComponents"
import AuthLayout from "app/core/layouts/AuthLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignUpLayout>
        <SignupForm onSuccess={() => router.push(Routes.LandingPage())} />
      </SignUpLayout>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <AuthLayout title="Sign Up">{page}</AuthLayout>

export default SignupPage
