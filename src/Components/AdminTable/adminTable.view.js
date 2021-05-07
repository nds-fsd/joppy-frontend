import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from '../SearchBar/searchBar.view';
import styles from './adminTable.module.css';
import { fetchMeStuff } from '../../Utils/functions';
// import Modal from '../Modal/modal.view';
import ModalDeleteOffer from '../ModalDeleteOffer';
import ModalCreateOffer from '../ModalCreateOffer';

const AdminTable = ({ endpoint }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseArray, setResponseArray] = useState([]);
  const [pageNum, setPageNum] = useState('0');
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [whichModal, setWhichModal] = useState('');
  const [whichOffer, setWhichOffer] = useState('');
  const [pageLimit, setPageLimit] = useState('5');
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const pageLimitNum = parseInt(pageLimit, 10);
  const sortBy = 'title';

  const initializeTotalPages = (count) => {
    setTotalPages(
      count % pageLimitNum === 0 ? count / pageLimitNum : Math.floor(count / pageLimitNum) + 1
    );
  };

  const previousPage = () =>
    parseInt(pageNum, 10) > 0 && setPageNum((parseInt(pageNum, 10) - 1).toString());

  const nextPage = () =>
    parseInt(pageNum, 10) < parseInt(totalPages, 10) - 1 &&
    setPageNum((parseInt(pageNum, 10) + 1).toString());

  const actualPageNumber = (page) => (parseInt(page, 10) + 1).toString();

  const offerDeleted = () => {
    setOpenModal(false);
    setTriggerRefresh(!triggerRefresh);
  };

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
    }),
    mode: 'cors',
    body: JSON.stringify({ search: searchQuery }),
  };

  useEffect(() => {
    fetchMeStuff(`http://localhost:3001/${endpoint}/count`, options, initializeTotalPages);
  }, [pageLimit, triggerRefresh]);

  useEffect(() => {
    fetchMeStuff(
      `http://localhost:3001/${endpoint}/search?page=${pageNum}&limit=${pageLimit}&sort=${sortBy}&dir=asc`,
      options,
      setResponseArray
    );
  }, [pageNum, pageLimit, searchQuery, triggerRefresh]);

  return (
    <div className={styles.tableBody}>
      {openModal && whichModal === 'delete' && (
        <ModalDeleteOffer
          offerId={whichOffer}
          handleOfferDeleted={offerDeleted}
          handleClose={() => setOpenModal(false)}
        />
      )}
      {openModal && whichModal === 'create' && (
        <ModalCreateOffer
          handleClose={() => setOpenModal(false)}
          handleOfferCreated={offerDeleted}
        />
      )}
      <div className={styles.topRow}>
        <SearchBar handleQuery={(q) => setSearchQuery(q)} />
        <button
          className={styles.createButton}
          type="button"
          onClick={() => {
            setWhichModal('create');
            setOpenModal(true);
          }}
        >
          Create +
        </button>
      </div>
      <div className={styles.firstTableRow}>
        <p className={styles.firstTableRowItem}>Title</p>
        <p className={styles.firstTableRowItem}>Position</p>
        <p className={styles.firstTableRowItem}>Description</p>
        <p className={styles.firstTableRowItem}>Status</p>
        <p className={styles.firstTableRowItem}>Creation Date</p>
      </div>
      <div className={styles.tableContents}>
        {responseArray &&
          responseArray.map((object) => (
            <div className={styles.tableRow}>
              <p className={styles.tableRowItem}>{object.title}</p>
              <p className={styles.tableRowItemColor}>
                {object.position.length > 0 ? object.position[0].name : 'Position'}
              </p>
              <p className={styles.tableRowItemTool}>{object.description}</p>
              <p className={styles.tooltip}>{object.description}</p>
              <p className={styles.tableRowItem}>Status</p>
              <p className={styles.tableRowItem}>{object.createdAt.substring(0, 10)}</p>
              <Dropdown drop="up" className={styles.dropdowndiv}>
                <Dropdown.Toggle variant="success" className={styles.options}>
                  ...
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdown}>
                  <Dropdown.Item className={styles.dropdownElement}>Edit offer</Dropdown.Item>
                  <Dropdown.Item className={styles.dropdownElement}>View offer</Dropdown.Item>
                  <Dropdown.Item className={styles.dropdownElement}>See candidates</Dropdown.Item>
                  <Dropdown.Item
                    className={styles.delete}
                    onClick={() => {
                      setWhichModal('delete');
                      setWhichOffer(object._id);
                      setOpenModal(true);
                    }}
                  >
                    Delete offer
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
      </div>
      <div className={styles.tableControls}>
        <p className={styles.controlField}>
          Rows per page:{' '}
          <span>
            <select onChange={(e) => setPageLimit(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </span>
        </p>
        <p className={styles.controlField}>
          Page <span>{actualPageNumber(pageNum)}</span> of <span>{totalPages}</span>
        </p>
        <button className={styles.arrowButton} type="button" onClick={previousPage}>
          {'<'}
        </button>
        <button className={styles.arrowButton} type="button" onClick={nextPage}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
