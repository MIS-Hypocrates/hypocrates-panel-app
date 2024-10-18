import {HTable, HTableColumns} from "@/shared/components/HTable";
import {cookies} from "next/headers";
import {Api} from "@/shared/Api";
import {IModel, ITablePage} from "@/Interfaces";
import {container} from "@/_app/AppContainer";

interface TableReferencesProps<T extends IModel> {
    endpoint: string;
    columns: HTableColumns<T>[];
}

const handleChangeRowsPerPage = async (perPage: number) => {
    'use server'
    cookies().set("PEER_PAGE", `${perPage}`);
}

const handleChangePage = async (page: number, endpoint) => {
    'use server'
    cookies().set(`${endpoint}_PAGE`, `${page}`);
}

export async function TableReferences<T extends IModel>({ endpoint, columns }: TableReferencesProps<T>) {
    const peerPage = cookies().get("PEER_PAGE")?.value ?? "25";
    const filter = cookies().get(`${endpoint}_FILTER`)?.value ?? "{}";
    const page = cookies().get(`${endpoint}_PAGE`)?.value ?? "1";

    const api = container.get<Api>(Api)


    const filterData = JSON.parse(filter)
    console.log(filterData)
    const pageData = await api.get<ITablePage<T>>(endpoint, { peerPage, page, ...filterData });



    if (!pageData) {
        throw new Error("Ошибка при получении данных. \nНе удалось получить данные");
    }

    return (
        <HTable
            columns={columns}
            page={pageData.page}
            pearPage={+peerPage}
            data={pageData.data}
            countData={pageData.countData}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={(value) => handleChangePage(value, endpoint)}
        />
    );
}