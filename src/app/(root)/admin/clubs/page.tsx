// import { getClubs } from '@/lib/actions/club.action'
// import Table from '../../../../components/shared/Table'
// import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
// import { Checkbox } from "@/components/ui/checkbox"

// type ClubType = {
//   _id: string,
//   title: string,
//   description: string,
//   category: string,
// }

// const columnHelper = createColumnHelper<ClubType>()

// const columns: ColumnDef<ClubType>[] = [
//   columnHelper.accessor('_id', {
//     header: 'ID',
//   }),
//   columnHelper.accessor('title', {
//     header: 'Title',
//   }),
//   columnHelper.accessor('description', {
//     header: 'Description',
//   }),
//   columnHelper.accessor('category', {
//     header: 'Category',
//   }),
// ]

// const Clubs = async () => {
//   const clubs = await getClubs()
  
//   return (
//     <>
//       Clubs
//       <Table columns={columns} data={clubs} />
//     </>
//   )
// }

// export default Clubs

const Clubs = () => {
  return (
    <>Clubs</>
  )
}
export default Clubs