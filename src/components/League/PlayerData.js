import * as React from 'react';
import './PlayerData.css';
import { Box, Modal } from '@material-ui/core';
import useFetch from '../../useFetch';
import { ArrowRightAlt } from '@material-ui/icons';
import { useParams } from 'react-router';


function BasicModal({id, open, handleClose}) {
  const {id : leagueId} = useParams()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  const {data} =  useFetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${id}&season=2021&league=${leagueId}`);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className="box">
          {data && data.length ? (
          <>
            <div className="player__info">
              <div className="availability">
                <p>Availabilty </p>
                <ArrowRightAlt />
                <p>{data[0].player.injured ? 'Injured' : 'Not injured'} </p>
              </div>
              <div className="more__info">
                <div className="key__details">
                  <p>NAME : {data[0].player.firstname} {data[0].player.lastname}</p>
                  <p>AGE : {data[0].player.age} years</p>
                  <p>CLUB: {data[0].statistics[0].team.name}</p>
                  <p>COUNTRY : {data[0].player.nationality}</p>

                </div>
                <img src={`${data[0].player.photo}`} alt={`${data[0].player.name}`} />
              </div>
            </div>
            <div className="player__stats">
                <div className="player__stat">
                  <div className="player__stat__header">
                    <img src={`${data[0].statistics[0].league.logo}`} alt='' />
                    <p>{data[0].statistics[0].league.name}</p>
                  </div>
                  <div className="player__stat__data">
                    <table>
                      <thead>
                        <tr>
                          <th>Club</th>
                          <th>MP</th>
                          <th>G</th>
                          <th>Pk</th>
                          <th>A</th>
                          <th>RC</th>
                          <th>YC</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="player__stat__info">
                            <img src={`${data[0].statistics[0].team.logo}`} alt='' />
                            <p>{data[0].statistics[0].team.name}</p>
                          </td>
                          <td>{data[0].statistics[0].games.minutes}</td>
                          <td>{data[0].statistics[0].goals.total}</td>
                          <td>{data[0].statistics[0].penalty.total ? data[0].statistics[0].penalty.total : 0}</td>
                          <td>{data[0].statistics[0].goals.assists ? data[0].statistics[0].goals.assists : 0}</td>
                          <td>{data[0].statistics[0].cards.red}</td>
                          <td>{data[0].statistics[0].cards.yellow}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          </>) : (
            <div>
              <p>NO PLAYER INFORMATION</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;