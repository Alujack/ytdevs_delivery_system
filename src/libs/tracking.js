import  {DeliveryStatus} from "@prisma/Client"

export function isValidStatusTransition(
  currentStatus,
  newStatus
){
  const validTransitions = {
    PENDING: ['ACCEPTED', 'CANCELLED'],
    ACCEPTED: ['PICKED_UP', 'CANCELLED'],
    PICKED_UP: ['IN_TRANSIT', 'CANCELLED'],
    IN_TRANSIT: ['DELIVERED', 'CANCELLED'],
    DELIVERED: [],
    CANCELLED: []
  }

  return validTransitions[currentStatus]?.includes(newStatus) ?? false
}
