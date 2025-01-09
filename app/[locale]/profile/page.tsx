import { useTranslations } from 'next-intl'
import React from 'react'

export default  function  Profile() {
   const t = useTranslations("ProfilePage");
  return (
    <div>{t("title")}</div>
  )
}

