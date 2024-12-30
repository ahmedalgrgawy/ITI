export const formatDate = (isoString) => {
    // Parse the ISO string into a Date object
    const date = new Date(isoString);

    // Format the components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Return the formatted date string
    return `${year}-${month}-${day}`;
}