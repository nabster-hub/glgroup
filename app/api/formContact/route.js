import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    try{
        const { name, phone, email, id, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = await request.json();
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
                "UF_CRM_1723206843835": id,
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const responseData = await response.json();

        return NextResponse.json({ success: true, data: JSON.stringify(responseData) });
    } catch (e) {
        return NextResponse.json({success: false, error: e});
    }

}