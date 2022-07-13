import moment from "moment";

export const formatDate = (isoDate: string, format: string = "YYYY/MM/DD") => {
    return moment(isoDate).isValid() ? moment(isoDate).format(format) : null;
};
