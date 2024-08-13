import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const { name, phone, email, utm_source, utm_medium, utm_campaign, utm_term, utm_content, message } = await request.json();
    // return NextResponse.json({name, phone, email});
    const body = {
        fields:{
            "NAME": name,
            "PHONE": [{
                "VALUE": phone,
                "TYPE_ID": "PHONE"
            }],
            "EMAIL": [{
                "VALUE": email,
                "TYPE_ID": "EMAIL"
            }],
            "SOURCE_ID": "WEB",
            "UF_CRM_1723206843835": "CONTACTFORM",
            "UF_CRM_1723206895928": message,
            "UTM_SOURCE": utm_source,
            "UTM_MEDIUM": utm_medium,
            "UTM_CAMPAIGN": utm_campaign,
            "UTM_CONTENT": utm_content,
            "UTM_TERM": utm_term
        },
        params: { "REGISTER_SONET_EVENT": "Y" }

    };

    const response = await fetch("https://goodluckgroup.bitrix24.id/rest/1/3agyk13zlggvmlgu/crm.lead.add.json", {
        method: 'POST', // Исправлено: метод должен быть строкой
        headers: {
            'Content-Type': 'application/json', // Исправлено: правильно указан Content-Type
        },
        body: JSON.stringify(body)
    });

    const responseData = await response.json();

    return NextResponse.json({ success: true, data: JSON.stringify(responseData) });
}
