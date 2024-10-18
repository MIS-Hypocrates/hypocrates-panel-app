
import {HTableLoading} from "@/shared/components/HTableLoading";

export default function loading() {

    return (
        <HTableLoading pearPage={25} columns={[
            { title: '№', align: 'right', minWidth: 100 },
            { title: "ФИО", align: 'left', minWidth: 200 },
            { title: "Дата рождения", align: 'left', minWidth: 200 },
            { title: "Возраст", align: 'left', minWidth: 100 }
        ]}/>
    )
}