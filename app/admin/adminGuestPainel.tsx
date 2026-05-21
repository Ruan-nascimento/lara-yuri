"use client";

import { useMemo, useState } from "react";

type Guest = {
    id: string;
    name: string;
    confirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type AdminGuestPanelProps = {
    guests: Guest[];
    logoutAction: () => Promise<void>;
};

export function AdminGuestPanel({
    guests,
    logoutAction,
}: AdminGuestPanelProps) {
    const [filter, setFilter] = useState<"all" | "confirmed" | "pending">(
        "all"
    );
    const [search, setSearch] = useState("");

    const confirmedGuests = guests.filter((guest) => guest.confirmed);
    const pendingGuests = guests.filter((guest) => !guest.confirmed);

    const filteredGuests = useMemo(() => {
        return guests.filter((guest) => {
            const matchesSearch = guest.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilter =
                filter === "all" ||
                (filter === "confirmed" && guest.confirmed) ||
                (filter === "pending" && !guest.confirmed);

            return matchesSearch && matchesFilter;
        });
    }, [guests, search, filter]);

    function handlePrint() {
        window.print();
    }

    return (
        <main className="min-h-screen bg-[#f9f2ec] px-5 py-8 font-sans text-[#4d342b]">
            <section className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] border border-[#ead7ca] bg-white/85 p-6 shadow-lg md:flex-row md:items-center print:hidden">
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#b98973]">
                            Painel administrativo
                        </p>

                        <h1 className="text-3xl font-semibold">
                            Convidados Lara & Yuri
                        </h1>

                        <p className="mt-2 text-sm text-[#7c6258]">
                            Controle de presença dos convidados do casamento.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handlePrint}
                            className="rounded-2xl bg-[#8f5f4d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#754b3d]"
                        >
                            Imprimir PDF
                        </button>

                        <form action={logoutAction}>
                            <button
                                type="submit"
                                className="rounded-2xl border border-[#d8b8a8] px-5 py-3 text-sm font-medium transition hover:bg-white"
                            >
                                Sair
                            </button>
                        </form>
                    </div>
                </header>

                <section className="mb-6 grid gap-4 md:grid-cols-3 print:hidden">
                    <InfoCard label="Total" value={guests.length} />
                    <InfoCard
                        label="Confirmados"
                        value={confirmedGuests.length}
                    />
                    <InfoCard
                        label="Não confirmados"
                        value={pendingGuests.length}
                    />
                </section>

                <section className="mb-6 rounded-[2rem] border border-[#ead7ca] bg-white/85 p-5 shadow-lg print:hidden">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Pesquisar convidado..."
                            className="rounded-2xl border border-[#ead7ca] bg-white px-4 py-3 font-sans outline-none transition focus:border-[#b98973]"
                        />

                        <div className="flex flex-wrap gap-2">
                            <FilterButton
                                active={filter === "all"}
                                onClick={() => setFilter("all")}
                            >
                                Todos
                            </FilterButton>

                            <FilterButton
                                active={filter === "confirmed"}
                                onClick={() => setFilter("confirmed")}
                            >
                                Confirmados
                            </FilterButton>

                            <FilterButton
                                active={filter === "pending"}
                                onClick={() => setFilter("pending")}
                            >
                                Não confirmados
                            </FilterButton>
                        </div>
                    </div>
                </section>

                <PrintableList
                    guests={filteredGuests}
                    total={guests.length}
                    confirmed={confirmedGuests.length}
                    pending={pendingGuests.length}
                />
            </section>
        </main>
    );
}

function InfoCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-[1.5rem] border border-[#ead7ca] bg-white/85 p-5 shadow-md">
            <p className="text-sm text-[#8f6d61]">{label}</p>

            <strong className="mt-2 block font-sans text-3xl font-bold tabular-nums text-[#4d342b]">
                {value}
            </strong>
        </div>
    );
}

function FilterButton({
    active,
    children,
    onClick,
}: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                    ? "bg-[#8f5f4d] text-white"
                    : "border border-[#ead7ca] bg-white text-[#6d5046] hover:bg-[#f9f2ec]"
            }`}
        >
            {children}
        </button>
    );
}

function PrintableList({
    guests,
    total,
    confirmed,
    pending,
}: {
    guests: Guest[];
    total: number;
    confirmed: number;
    pending: number;
}) {
    return (
        <section className="print-area rounded-[2rem] border border-[#ead7ca] bg-white p-6 shadow-lg">
            <div className="mb-6 border-b border-[#ead7ca] pb-5">
                <p className="text-sm uppercase tracking-[0.3em] text-[#b98973]">
                    Casamento Lara & Yuri
                </p>

                <h2 className="mt-2 text-3xl font-semibold">
                    Lista de convidados
                </h2>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                    <PrintStat label="Total" value={total} />
                    <PrintStat label="Confirmados" value={confirmed} />
                    <PrintStat label="Não confirmados" value={pending} />
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#ead7ca]">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-[#f3e4da]">
                        <tr>
                            <th className="px-4 py-3 font-semibold">#</th>
                            <th className="px-4 py-3 font-semibold">Nome</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {guests.map((guest, index) => (
                            <tr
                                key={guest.id}
                                className="border-t border-[#f0ded4]"
                            >
                                <td className="px-4 py-3 font-sans tabular-nums text-[#8f6d61]">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-3 font-medium">
                                    {guest.name}
                                </td>

                                <td className="px-4 py-3">
                                    {guest.confirmed ? (
                                        <span className="rounded-full bg-green-50 px-3 py-1 font-sans text-xs font-medium text-green-700">
                                            Confirmado
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-amber-50 px-3 py-1 font-sans text-xs font-medium text-amber-700">
                                            Não confirmado
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {guests.length === 0 && (
                <p className="py-10 text-center text-sm text-[#8f6d61]">
                    Nenhum convidado encontrado.
                </p>
            )}

            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                    }

                    body * {
                        visibility: hidden;
                    }

                    .print-area,
                    .print-area * {
                        visibility: visible;
                    }

                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }

                    table {
                        page-break-inside: auto;
                    }

                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }
                }
            `}</style>
        </section>
    );
}

function PrintStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-2xl bg-[#f9f2ec] px-4 py-3">
            <span className="block text-[#8f6d61]">{label}</span>

            <strong className="font-sans text-xl font-bold tabular-nums text-[#4d342b]">
                {value}
            </strong>
        </div>
    );
}