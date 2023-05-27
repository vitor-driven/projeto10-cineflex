import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetShowtimes } from "../../Requests";

export default function SessionsPage() {
    const [sessions, setSessions] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        GetShowtimes(movieId, updateSessions);
    }, []);

    function updateSessions(data) {
        setSessions(data);
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.days
                    ? sessions.days.map((s) => (
                          <SessionContainer key={s.id}>
                              <div>
                                  <div className="date">
                                      {s.weekday} - {s.date}
                                  </div>
                                  <ButtonsContainer className="showtime-list">
                                      {s.showtimes.map((time) => (
                                          <button key={time.id}>
                                              <Link to={`/assentos/${time.id}`}>
                                                  {time.name}
                                              </Link>
                                          </button>
                                      ))}
                                  </ButtonsContainer>
                              </div>
                          </SessionContainer>
                      ))
                    : "..."}
            </div>
            <FooterContainer>
                <div>
                    <img
                        src={
                            "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
                        }
                        alt="poster"
                    />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                </div>
            </FooterContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Roboto";
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`;
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "Roboto";
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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
