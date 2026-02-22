import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import styles from "./shapes.module.css";

const { Title } = Typography;

type ShapeType =
  | "square"
  | "circle"
  | "ellipse"
  | "trapezoid"
  | "rectangle"
  | "parallelogram";

const INITIAL_SHAPES: ShapeType[] = [
  "square",
  "circle",
  "ellipse",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

const Shape = ({ type }: { type: ShapeType }) => (
  <div className={styles[type]} />
);

export default function Test1Page() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<ShapeType[]>([...INITIAL_SHAPES]);

  const moveShape = (direction: "left" | "right") => {
    setShapes((prev) => {
      const arr = [...prev];
      if (direction === "left") arr.push(arr.shift()!);
      else arr.unshift(arr.pop()!);
      return arr;
    });
  };

  const swapPosition = () => {
    setShapes((prev) => [...prev.slice(3, 6), ...prev.slice(0, 3)]);
  };

  const shuffleShapes = () => {
    setShapes((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className={styles.container}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        {t("test1.title")}
      </Title>

      <div className={styles.buttonRow}>
        <div className={styles.actionBtn} onClick={() => moveShape("left")}>
          <div className={styles.triangleRow}>
            <div className={styles.miniTriangleLeft} />
          </div>
          <span className={styles.actionBtnLabel}>{t("test1.moveShape")}</span>
        </div>

        <div className={styles.actionBtn} onClick={swapPosition}>
          <div className={styles.arrowsUpDown}>
            <div className={styles.miniArrowUp} />
            <div className={styles.miniArrowDown} />
          </div>
          <span className={styles.actionBtnLabel}>
            {t("test1.movePosition")}
          </span>
        </div>

        <div className={styles.actionBtn} onClick={() => moveShape("right")}>
          <div className={styles.triangleRow}>
            <div className={styles.miniTriangleRight} />
          </div>
          <span className={styles.actionBtnLabel}>{t("test1.moveShape")}</span>
        </div>
      </div>

      <div className={styles.shapeGrid}>
        {shapes.map((shape, index) => (
          <div
            key={`${shape}-${index}`}
            className={styles.shapeCell}
            onClick={shuffleShapes}
          >
            <Shape type={shape} />
          </div>
        ))}
      </div>
    </div>
  );
}
