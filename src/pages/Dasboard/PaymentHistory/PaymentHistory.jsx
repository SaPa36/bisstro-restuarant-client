import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-10">
            <div className="text-center ">
                <p className="text-yellow-600 italic">---At a Glance!---</p>
                <h2 className="text-3xl font-semibold border-y-4 py-4 border-gray-600 uppercase w-fit mx-auto px-10">Payment History</h2>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 font-serif">Total Payments: {payments.length}</h3>
                
                <div className="overflow-x-auto rounded-t-2xl shadow-sm">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white py-5">
                            <tr className="uppercase tracking-wider">
                                <th className="p-5">#</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-5">{index + 1}</td>
                                    <td className="font-semibold text-gray-800">${payment.price}</td>
                                    <td className="text-gray-600">{payment.transactionId}</td>
                                    <td>
                                        <span className="badge badge-ghost font-medium bg-indigo-100 text-indigo-700 border-none">
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="text-gray-600">{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;