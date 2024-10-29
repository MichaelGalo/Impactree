import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type DeletePlanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const DeletePlanModal = ({ isOpen, onClose, onDelete }: DeletePlanModalProps) => {
  const cardClasses = `bg-gray-100 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-sm`;

  const secondaryButtonClasses = `bg-transparent hover:bg-red-300 dark:hover:bg-gray-700
    text-red-600 dark:text-gray-400
    px-4 py-2 rounded
    border border-red-600 dark:border-gray-400`;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50",
        base: cardClasses,
        header: "border-b border-gray-200 dark:border-gray-700",
        footer: "border-t border-gray-200 dark:border-gray-700",
        closeButton: "hover:bg-gray-100 dark:hover:bg-gray-700",
        body: "text-gray-600 dark:text-gray-400",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-gray-900 dark:text-gray-100">
              Are you sure?
            </ModalHeader>
            <ModalBody>
              <p>
                This action cannot be undone. This will permanently delete your impact plan.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button 
                className={secondaryButtonClasses}
                onPress={onClose}
                variant="light"
              >
                Cancel
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onPress={() => {
                  onDelete();
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};