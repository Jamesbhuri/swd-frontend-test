import { useTranslation } from "react-i18next";
import { Button, Space } from "antd";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Space>
      <Button
        type={i18n.language === "en" ? "primary" : "default"}
        size="small"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        type={i18n.language === "th" ? "primary" : "default"}
        size="small"
        onClick={() => i18n.changeLanguage("th")}
      >
        TH
      </Button>
    </Space>
  );
}
