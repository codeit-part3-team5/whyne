interface DeleteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function DeleteModal({ onClose, children }: DeleteModalProps) {
  return (
    <div onClick={onClose}>
      <div>{children}</div>
    </div>
  );
}
