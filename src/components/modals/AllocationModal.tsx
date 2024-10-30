"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { ImpactPlan, ImpactPlanCharity } from "@/types/impactPlan.types";
import { formatCurrency, getTotalAllocated, unallocatedFunds } from '@/utils/impactMetrics';
import { useEffect, useState } from "react";

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCharity: ImpactPlanCharity | null;
  impactPlan: ImpactPlan | null;
  onUpdateAllocation: (charityId: number, amount: number) => Promise<void>;
  onDeleteCharity: (charityId: number) => Promise<void>;
}

const AllocationModal = ({
  isOpen,
  onClose,
  selectedCharity,
  impactPlan,
  onUpdateAllocation,
  onDeleteCharity
}: AllocationModalProps) => {
  const [newAllocationAmount, setNewAllocationAmount] = useState<string>("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && selectedCharity) {
      setNewAllocationAmount(String(selectedCharity.allocation_amount));
    }
  }, [isOpen, selectedCharity]);

  const handleClose = () => {
    setNewAllocationAmount("");
    onClose();
  };

  const handleUpdate = async () => {
    if (!selectedCharity || !newAllocationAmount) return;
    await onUpdateAllocation(selectedCharity.id, Number(newAllocationAmount));
    handleClose();
  };

  const handleDelete = async () => {
    if (!selectedCharity) return;
    await onDeleteCharity(selectedCharity.id);
    handleClose();
  };

  // Style classes
  const inputClasses = `w-full border rounded p-2
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    focus:border-blue-500 dark:focus:border-blue-400
    placeholder-gray-400 dark:placeholder-gray-500`;

  const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`;

  const primaryButtonClasses = `bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
    text-blue-600 dark:text-blue-400 
    px-4 py-2 rounded
    border border-blue-600 dark:border-blue-400`;

  const secondaryButtonClasses = `bg-transparent hover:bg-red-300 dark:hover:bg-gray-700
    text-red-600 dark:text-gray-400
    px-4 py-2 rounded
    border border-red-600 dark:border-gray-400`;

  const cardClasses = `bg-gray-100 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-sm`;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
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
              Update Donation for {selectedCharity?.charity.name}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Annual Allocation Available
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {impactPlan ? unallocatedFunds(impactPlan) : '$0.00'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    of {impactPlan ? formatCurrency(Number(impactPlan.total_annual_allocation)) : '$0.00'} total
                  </p>
                </div>
                <div>
                  <label htmlFor="allocation-amount" className={labelClasses}>
                    Allocation Amount
                  </label>
                  <input
                    type="number"
                    id="allocation-amount"
                    value={newAllocationAmount}
                    onChange={(e) => setNewAllocationAmount(e.target.value)}
                    className={inputClasses}
                    min={0}
                    max={impactPlan ? (
                      Number(impactPlan.total_annual_allocation) - 
                      getTotalAllocated(impactPlan) + 
                      (selectedCharity ? Number(selectedCharity.allocation_amount) : 0)
                    ) : 0}
                    step={0.01}
                    placeholder="Enter allocation amount"
                  />
                  {selectedCharity && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Current allocation: {formatCurrency(Number(selectedCharity.allocation_amount))}
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button 
                className={secondaryButtonClasses}
                onPress={handleDelete}
              >
                Remove Charity
              </Button>
              <div className="flex gap-2">
                <Button 
                  className={secondaryButtonClasses}
                  onPress={onClose}
                  variant="light"
                >
                  Cancel
                </Button>
                <Button 
                  className={primaryButtonClasses}
                  onPress={handleUpdate}
                >
                  Save
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AllocationModal;