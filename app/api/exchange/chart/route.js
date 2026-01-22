import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const bank = searchParams.get("bank");
    const currency = searchParams.get("currency");
    const range = searchParams.get("range") || "7d";

    if (!bank || !currency) {
        return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const now = new Date();
    let from;

    if (range === "7d") {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else if (range === "1m") {
        from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    } else if (range === "6m") {
        from = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    } else {
        from = new Date(0);
    }

    const { data, error } = await supabase
        .from("exchange_rates")
        .select("timestamp,buy,sell")
        .eq("bank", bank)
        .eq("currency", currency)
        .gte("timestamp", from.toISOString())
        .order("timestamp", { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json([]);
    }

    const byDay = {};

    for (const row of data) {
        const d = new Date(row.timestamp);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

        if (!byDay[key]) {
            byDay[key] = {
                timestamp: new Date(key).toISOString(),
                buy: row.buy,
                sell: row.sell,
                count: 1
            };
        } else {
            byDay[key].buy += row.buy;
            byDay[key].sell += row.sell;
            byDay[key].count++;
        }
    }

    const result = Object.values(byDay)
        .map(d => ({
            timestamp: d.timestamp,
            buy: d.buy / d.count,
            sell: d.sell / d.count
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return NextResponse.json(result);
}
