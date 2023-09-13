import axios from "axios";
import { DiagnoseEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
    return data;
}

const getOneDiagnose = async (code: string) => {
    const { data } = await axios.get<DiagnoseEntry>(`${apiBaseUrl}/diagnoses/${code}`);
    return data;
}

export default {
    getAll,
    getOneDiagnose
}