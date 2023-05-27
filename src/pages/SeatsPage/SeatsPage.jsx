import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSeats } from "../../Requests";

export default function SeatsPage() {
    const [seats, setSeats] = useState([]);
    const [footer, setFooter] = useState({});
    const [purchase, setPurchase] = useState({});
    const { showtimeId } = useParams();

    useEffect(() => {
        GetSeats(showtimeId, updateSeats);
    }, []);

    function updateSeats(data) {
        let footerData = {};
        footerData = {
            poster: data.movie.posterURL,
            name: data.movie.title,
            weekday: data.day.weekday,
            time: data.name,
        };

        setFooter((footer) => ({
            ...footer,
            ...footerData,
        }));
        setSeats(data.seats);
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {seats.length > 0
                    ? seats.map((s) => (
                          <SeatItem
                              key={s.id}
                              data-test="seat"
                              className={`seat ${
                                  s.isAvailable ? "" : "unavailable"
                              } ${s.isSelected ? "selected" : ""}`}
                          >
                              {s.name}
                          </SeatItem>
                      ))
                    : "..."}
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle className="selected" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="unavailable" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
            <FormContainer>
                Nome do Comprador:
                <input
                    data-test="client-name"
                    placeholder="Digite seu nome..."
                />
                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." />
                <button>Reservar Assento(s)</button>
            </FormContainer>
            <FooterContainer data-test="footer">
                <div>
                    <img src={footer.poster} alt="poster" />
                </div>
                <div>
                    <p>{footer.name}</p>
                    <p>
                        {footer.weekday} - {footer.time}
                    </p>
                </div>
            </FooterContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Roboto";
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const FormContainer = styled.div`
    width: calc(100vw - 40px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;
const CaptionCircle = styled.div`
    border: 1px solid #7b8b99;
    background-color: #c3cfd9;
    &.unavailable {
        border: 1px solid #f7c52b;
        background-color: #fbe192;
    }

    &.selected {
        border: 1px solid #0e7d71;
        background-color: #1aae9e;
    }
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;
const SeatItem = styled.div`
    border: 1px solid #7b8b99;
    background-color: #c3cfd9;
    &.unavailable {
        border: 1px solid #f7c52b;
        background-color: #fbe192;
    }

    &.selected {
        border: 1px solid #0e7d71;
        background-color: #1aae9e;
    }
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: "Roboto";
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #c3cfd9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001a;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;
