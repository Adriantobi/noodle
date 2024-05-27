import { X } from "lucide-react";
import styles from "../css/modal.module.css";

type ModalProps = {
  title: string;
  setState: (arg0: string) => void;
  name: string;
  children: React.ReactNode;
};

export default function Modal({ title, setState, name, children }: ModalProps) {
  return (
    <div className={styles.modalWrapper} onClick={() => setState(name)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <span
            className={styles.modalCloseButton}
            onClick={() => {
              setState(name);
            }}
          >
            <X />
          </span>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}
