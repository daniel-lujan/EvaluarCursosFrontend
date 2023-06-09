import { QUESTIONS } from "../middleware/constants";
import "./AnswerOverview.css";
import { Content } from "./Content";
import Icon from "./icons/Icon";

const QUALIFICATIONS = {
  1: "Muy malo",
  2: "Malo",
  3: "Regular",
  4: "Bueno",
  5: "Excelente",
};

const AnswerOverview = ({
  answers,
  onEditAnswer,
  onReturn,
  onSend,
  disableButton,
}) => {
  function handleEditClick(id) {
    try {
      onEditAnswer(id);
    } catch {}
  }

  return (
    <Content>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div className="container">
          <p className="title">TUS RESPUESTAS</p>
          <div className="ans-overview">
            {Object.keys(QUESTIONS).map(
              (q) =>
                q !== "feedback" && (
                  <div key={q} className="ans-overview-row">
                    <p>{QUESTIONS[q].question}</p>
                    <div className="qualification">
                      <p>
                        {answers[q] ? (
                          QUALIFICATIONS[answers[q]]
                        ) : (
                          <Icon icon="forbid" size={18} />
                        )}
                      </p>
                      <Icon
                        className="edit-button"
                        icon="editCircle"
                        size={18}
                        onClick={() => handleEditClick(q)}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="form" onClick={onReturn}>
            <Icon icon="arrowBack" style={{ marginRight: "6px" }} />
            Volver
          </button>
          <button className="form" onClick={onSend} disabled={disableButton}>
            {disableButton ? "Enviando..." : "Enviar"}
            <Icon icon="send" style={{ marginLeft: "6px" }} />
          </button>
        </div>
      </div>
    </Content>
  );
};

export default AnswerOverview;
