import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminGuestPanel } from "./adminGuestPainel";

export const dynamic = "force-dynamic";

function getAdminPassword() {
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
        throw new Error("ADMIN_PASSWORD não foi configurada no ambiente.");
    }

    return password;
}

function getAdminToken() {
    return crypto
        .createHash("sha256")
        .update(getAdminPassword())
        .digest("hex");
}

async function login(formData: FormData) {
    "use server";

    const password = String(formData.get("password") || "");

    if (password !== getAdminPassword()) {
        redirect("/admin?error=1");
    }

    const cookieStore = await cookies();

    cookieStore.set("admin-token", getAdminToken(), {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/admin",
        maxAge: 60 * 60 * 8,
    });

    redirect("/admin");
}

async function logout() {
    "use server";

    const cookieStore = await cookies();

    cookieStore.delete("admin-token");

    redirect("/admin");
}

type AdminPageProps = {
    searchParams?: Promise<{
        error?: string;
    }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
    const params = await searchParams;
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;
    const isAuthenticated = token === getAdminToken();

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-[#f9f2ec] px-6 py-10 font-sans text-[#4d342b]">
                <section className="mx-auto flex min-h-[70vh] max-w-md items-center">
                    <div className="w-full rounded-[2rem] border border-[#ead7ca] bg-white/85 p-8 shadow-xl">
                        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#b98973]">
                            Área restrita
                        </p>

                        <h1 className="mb-3 text-3xl font-semibold">
                            Lista de convidados
                        </h1>

                        <p className="mb-8 text-sm leading-relaxed text-[#7c6258]">
                            Digite a senha administrativa para visualizar os
                            convidados confirmados e não confirmados.
                        </p>

                        {params?.error && (
                            <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                Senha incorreta. Tente novamente.
                            </div>
                        )}

                        <form action={login} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Senha
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Digite a senha"
                                    className="w-full rounded-2xl border border-[#ead7ca] bg-white px-4 py-3 font-sans outline-none transition focus:border-[#b98973]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-[#8f5f4d] px-5 py-3 font-medium text-white transition hover:bg-[#754b3d]"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        );
    }

    const guests = await prisma.guest.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return <AdminGuestPanel guests={guests} logoutAction={logout} />;
}