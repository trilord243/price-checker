// OptionsPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OptionsPage.css";

function OptionsPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const handleOptionClick = (option) => {
        switch (option) {
            case "chat":
                navigate("/localChat");
                break;
            case "config":

                break;
            default:
                break;
        }
    };

    return (
        <div className="options-container">
            <div className="option-card" onClick={() => handleOptionClick("chat")}>
                <h2>Charla con gerente</h2>
            </div>
            <div className="option-card" onClick={() => handleOptionClick("config")}>
                <h2>Configuraciones</h2>
            </div>
            <div className="option-card" onClick={() => handleOptionClick("option3")}>
                <h2>Opción 3</h2>
            </div>
            <div className="option-card" onClick={() => handleOptionClick("option4")}>
                <h2>Opción 4</h2>
            </div>
            <div className="option-card" onClick={handleBack}>
                <h2>Retornar</h2>
            </div>
        </div>
    );
}

export default OptionsPage;
