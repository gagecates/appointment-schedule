import '../App.css'

export default function Modalz ({ handleClose, modal, children }) {
  const showHideClassName = modal ? "modalz display-block" : "modalz display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};