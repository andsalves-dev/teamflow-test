import { Modal } from 'react-bootstrap';

const GifModal = ({ gif, onHide }) => {
  if (!gif) return null

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
      size="lg"
      onHide={onHide}
    >
      <img src={gif.urlOriginal} alt={gif.title} />
    </Modal>
  )
}

export default GifModal;
