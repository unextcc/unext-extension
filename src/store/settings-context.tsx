import React, { createContext, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

// Declare settings context type
type SettingsContextType = {
  shownPage: string
  lockPassword: { password: string; timeStamp: number }
  lockPasswordRemove: () => void
  lockPasswordTimeToLive: number
  lockPasswordHandler: (password: string, timeStamp: number) => void
  lockPasswordTimeToLiveHandler: (timeToLive: number) => void
  shownPageHandler: (page: string) => void
  requirePasswordWhenSend: boolean
  requirePasswordWhenSendHandler: (status: boolean) => void
}

interface Props {
  children?: React.ReactNode
}

export const SettingsContext = createContext<SettingsContextType>({
  lockPassword: { password: "", timeStamp: 0 },
  lockPasswordRemove: () => {},
  lockPasswordTimeToLive: 86400,
  shownPage: "",
  lockPasswordHandler: (password: string) => {},
  lockPasswordTimeToLiveHandler: (timeToLive: number) => {},
  shownPageHandler: (page: string) => {},
  requirePasswordWhenSend: false,
  requirePasswordWhenSendHandler: (status: boolean) => {}
})

const SettingsContextProvider: React.FC<Props> = (props) => {
  // Define lock password
  const [lockPassword, setLockPassword, { remove }] = useStorage(
    "lock-password",
    (v) => (typeof v === "undefined" ? "" : v)
  )

  const [lockPasswordTimeToLive, setLockPasswordTimeToLive] = useStorage(
    "lock-password-time-to-live",
    (v) => (typeof v === undefined ? 86400 : v)
  )

  const [requirePasswordWhenSend, setRequirePasswordWhenSend] = useStorage(
    "require-password-when-send",
    (v) => (typeof v === undefined ? false : v)
  )

  const requirePasswordWhenSendHandler = (status: boolean) => {
    setRequirePasswordWhenSend(status)
  }

  const [shownPage, setShownPage] = useState<string>("dashboard")

  const lockPasswordHandler = async (password: string, timeStamp: number) => {
    await setLockPassword({ password: password, timeStamp: timeStamp })
  }

  const lockPasswordTimeToLiveHandler = async (
    timeToLive: number | undefined
  ) => {
    await setLockPasswordTimeToLive(timeToLive)
  }

  const shownPageHandler = (page: string) => {
    setShownPage(page)
  }

  const settingsContextValue: SettingsContextType = {
    lockPassword: lockPassword,
    lockPasswordRemove: remove,
    lockPasswordTimeToLive: lockPasswordTimeToLive,
    shownPage: shownPage,
    lockPasswordHandler: lockPasswordHandler,
    lockPasswordTimeToLiveHandler: lockPasswordTimeToLiveHandler,
    shownPageHandler: shownPageHandler,
    requirePasswordWhenSend: requirePasswordWhenSend,
    requirePasswordWhenSendHandler: requirePasswordWhenSendHandler
  }

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider
