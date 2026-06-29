import { useCallback, useState } from "react";

const useApi = () => {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const execute = useCallback(async (apiFunction) => {

        try {

            setLoading(true);

            setError(null);

            const response = await apiFunction();

            return response;

        } catch (err) {

            setError(err);

            throw err;

        } finally {

            setLoading(false);

        }

    }, []);

    return {

        loading,

        error,

        execute

    };

};

export default useApi;