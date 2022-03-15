import { useRouter } from "next/router";
import { useEffect } from "react";

import { getProviders, getSession, useSession } from "next-auth/react";

import AuthButton from "../../components/AuthButton/AuthButton";
import { faGoogle, faYandex } from "@fortawesome/free-brands-svg-icons";

export default function SignIn({ providers }) {

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if(session) router.back()
    }, [session])

    return (
        <div>
            <div>
                <AuthButton
                    provider={providers.google}
                    background="#4CAF50"
                    icon={faGoogle}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
