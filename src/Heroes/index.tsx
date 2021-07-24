import {useState, useEffect} from 'react';
//import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import api from '../services/api';

import './styles.scss';

type heroType = {
	id: number;
	localized_name: string;
    primary_attr: string;
    attack_type: string;
    img: string;
    pro_ban: string;
    pro_win: string;
    pro_pick: string;
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#0d1117',
    },

    overlay: {
        backgroundColor: 'rgba(33, 33, 33, 0.75)'
    },
};

export function Heroes() {
    const [heroes, setHeroes] = useState([]);
    const [modalInfo, setModalInfo] = useState<heroType[]>([]);
    
    const [show, setShow] = useState(false);

    const changeContent = (hero : heroType) => {
        setModalInfo([hero]);
        setShow(true);
    }

    function closeModal() {
        setShow(false);
    }

    useEffect(() => {
        api.get('heroStats').then(response => {
            const heroes = response.data;
            setHeroes(heroes);
        })
    }, []);

    return (
        <div className="home">

            <header>
                <h2>Dota 2 Heroes Stats</h2>

                <p>Stats of all dota 2 heroes in pro matchs</p>

                <span>Meta</span>
            </header>

            <section className="allHeroes">

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Atr</th>
                            <th>Atk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map((hero : heroType) => {
                            return (
                                <tr key={hero.id}>                                
                                    <td style={{ width: 72 }}>
                                        <img
                                            src={`https://api.opendota.com${hero.img}`}
                                            alt={hero.localized_name}
                                        />
                                    </td>
                                    <td>
                                        <a onClick={() => changeContent(hero)}> {hero.localized_name}</a>
                                    </td>
                                    <td>{hero.primary_attr}</td>
                                    <td style={{ width: 100 }}>{hero.attack_type}</td>
                                </tr>                     
                            )
                        })}
                    </tbody>
                </table>
            </section>

            <Modal
                isOpen={show}
                onRequestClose={closeModal}
                style={customStyles}
                >
                
                {modalInfo.map((hero : heroType) => {
                    return (

                        <div className="modalInfo">
                            <img
                                width={180}
                                height={128}
                                src={`https://api.opendota.com${hero.img}`}
                                alt={hero.localized_name}
                            />

                            { hero.pro_pick ? (
                                <div>
                                    <p>Pick</p>
                                    <p className="pick">{hero.pro_pick}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Pick</p>
                                    <p>0</p>
                                </div>
                            )}

                            { hero.pro_ban ? (
                                <div>
                                    <p>Ban</p>
                                    <p className="ban">{hero.pro_ban}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Ban</p>
                                    <p className="ban">0</p>
                                </div>
                            )}

                            { hero.pro_win ? (
                                <div>
                                    <p>Win</p>
                                    <p className="win">{hero.pro_win}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Win</p>
                                    <p className="win">0</p>
                                </div>
                            )}

                            { (Number(`${hero.pro_pick}`) - Number(`${hero.pro_win}`)) ? (
                                <div>
                                    <p>Loss</p>
                                    <p className="loss">{(Number(`${hero.pro_pick}`) - Number(`${hero.pro_win}`))}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Loss</p>
                                    <p className="loss">0</p>
                                </div>
                            )}

                            { (Number(`${hero.pro_win}`) / Number(`${hero.pro_pick}`)) ? (
                                <div>
                                    <p>Win %</p>
                                    <p className="win">{(Number(`${hero.pro_win}`) / Number(`${hero.pro_pick}`) * 100).toFixed(2)}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Win %</p>
                                    <p className="win">0</p>
                                </div>
                            )}

                            { (Number(`${hero.pro_pick}`) - Number(`${hero.pro_win}`)) ? (
                                <div>
                                    <p>Loss %</p>
                                    <p className="loss">{(((Number(`${hero.pro_pick}`) - Number(`${hero.pro_win}`)) / Number(`${hero.pro_pick}`)) * 100).toFixed(2)}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Loss %</p>
                                    <p className="loss">0</p>
                                </div>
                            )}

                            <button onClick={closeModal}>X</button>
                        </div>
                    )
                })}
            </Modal>

        </div>
    );
}