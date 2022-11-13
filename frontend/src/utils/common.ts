import moment from "moment";

export const handleShowData = ( value: any) => {
    return moment(value).format("MM-DD-YYYY");
};