import styles from '@/styles/Purchase.module.css'
import CheckoutHeader from "@/components/checkout/Header";
import ProductList from "@/components/checkout/ProductList";
import CartPrice from "@/components/checkout/CartPrice";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Nextauth from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import { useAppDispatch } from '@/redux/checkoutSlice';
import { fetchCart } from '@/redux/checkoutSlice';

function Cart() {
    const dispatch = useAppDispatch()
    fetchCart(dispatch)
    return (
        <>
            <CheckoutHeader />
            <div className={styles['ticket']}>
                <ProductList />
                <CartPrice />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, Nextauth)

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}

export default Cart