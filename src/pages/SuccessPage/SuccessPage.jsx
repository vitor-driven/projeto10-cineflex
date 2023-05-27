import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { purchase, data } = location.state;
    console.log(purchase, data);
    return (
        <PageContainer>
            <h1>
                Pedido feito <br /> com sucesso!
            </h1>

            <TextContainer data-test="movie-info">
                <strong>
                    <p>Filme e sessão</p>
                </strong>
                <p>{data.name}</p>
                <p>03/03/2023 - {data.time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong>
                    <p>Ingressos</p>
                </strong>
                {data.seatNames.map((s) => (
                    <p>Assento {s}</p>
                ))}
                <p>Assento 01</p>
                <p>Assento 02</p>
                <p>Assento 03</p>
            </TextContainer>

            <TextContainer data-test="clients-info">
                <strong>
                    <p>Comprador</p>
                </strong>
                <p>Nome: {purchase.name}</p>
                <p>CPF: {purchase.cpf}</p>
            </TextContainer>

            <button>Voltar para Home</button>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Roboto";
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247a6b;
    }
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`;
