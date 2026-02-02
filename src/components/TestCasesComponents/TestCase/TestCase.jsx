import styles from "./TestCase.module.css";
import clsx from "clsx";

export default function TestCase({ id, description, steps, expectedResult }) {
  return (
    <div className={clsx(styles.testCaseWindow)}>
      <div className="description">
        <p>
          <strong>Test case {id}: </strong>
          {description}
        </p>
      </div>
      <ol>
        <p>
          <strong>Steps:</strong>
        </p>
        {steps.map((step) => (
          <li>{step}</li>
        ))}
      </ol>
      <div className="expectedResult">
        <p>
          <strong>Expected: </strong>
          {expectedResult}
        </p>
      </div>
    </div>
  );
}
