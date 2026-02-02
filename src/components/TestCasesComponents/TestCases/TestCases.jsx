import { Link } from "react-router-dom";
import testCases from "../../../tests/test-cases.json";
import TestCase from "../TestCase/TestCase";
import clsx from "clsx";
import styles from "./TestCases.module.css";

function formatId(text) {
  const words = text.split(" ");

  const wordsToCamelCase = words.map((item, index) =>
    index === 0 ? item : item.at(0).toUpperCase() + item.slice(1).toLowerCase(),
  );

  return wordsToCamelCase.join("");
}

export default function TestCases() {
  const uniqueAreas = [...new Set(testCases.map((tc) => tc.area))];

  return (
    <>
      <Link to="/">
        <button className={clsx(styles.backToMainPageBtn, "heading-xs")}>
          Main Page
        </button>
      </Link>

      <h1 className={clsx("heading-l", styles.mainHeader)}>
        Tic tac toe - test cases
      </h1>

      <nav className={styles.areaLinks}>
        <ul className={styles.areaList}>
          {uniqueAreas.map((area) => (
            <li key={area} className={styles.areaElement}>
              <a href={`#${formatId(area)}`}>{area}</a>
            </li>
          ))}
        </ul>
      </nav>

      {testCases.map((tc, index) => {
        const isNewArea = index === 0 || tc.area !== testCases[index - 1].area;

        return (
          <>
            {isNewArea && (
              <h2
                id={formatId(tc.area)}
                className={clsx("heading-m", styles.areaHeading)}
              >
                {tc.area}
              </h2>
            )}
            <TestCase
              id={index + 1}
              area={tc.area}
              description={tc.description}
              steps={tc.steps}
              expectedResult={tc.expected_result}
            />
          </>
        );
      })}
    </>
  );
}
