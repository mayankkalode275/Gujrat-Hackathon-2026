export const vehicleValidation = (data) => {
  if (!data.name) return { error: "Vehicle name required" };
  if (!data.model) return { error: "Model required" };
  if (!data.licensePlate) return { error: "License plate required" };
  if (!data.capacity || data.capacity <= 0) return { error: "Capacity must be > 0" };
  return {};
};