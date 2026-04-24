// @author: Vijaya Bhaskar Velagana

import { useState } from "react";
import axios from "axios"; // axious is used to make HTTP requests to the backend API
import QRCode from "react-qr-code"; // react-qr-code is used to generate QR codes for the shortened URLs
import QRCodeGenerator from "qrcode"; // qrcode is used to generate QR code images for the shortened URLs

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [copied, setCopied] = useState(false);
	const [qrImage, setQrImage] = useState("");
	const [demoCopied, setDemoCopied] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleShorten = async () => {
		if(!url || loading) return alert("Please enter a URL");
		setLoading(true);
		try {
			const res = await axios.post(`${API_BASE_URL}/shorten`, { 
				originalUrl: url
			});

			const newShortUrl = res.data.shortUrl;
			setShortUrl(newShortUrl);
			setCopied(false);

			const qr = await QRCodeGenerator.toDataURL(newShortUrl);
			setQrImage(qr);

		} catch (error) {
			console.error("Error shortening URL:", error);
			alert("Failed to shorten URL. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
	};

	const demoUrl = "https://images.unsplash.com/photo-1562874639-bd3f2fd7fcdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	const handleDemoCopy = () => {
		navigator.clipboard.writeText(demoUrl);
		setDemoCopied(true);
		setTimeout(() => setDemoCopied(false), 2000);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
			<h1 className="text-4xl font-bold mb-6">MERN URL Shortener</h1>
			
			{/* Demo URL Box */}
			<div className="w-full max-w-md mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded">
				<p className="text-sm font-semibold text-blue-700 mb-2">📌 Demo URL</p>
				<div className="bg-white p-3 rounded border border-blue-200 mb-3 break-all text-sm text-gray-700">
					{demoUrl}
				</div>
				<button
					onClick={handleDemoCopy}
					className={`w-full px-3 py-2 rounded font-medium transition-colors ${demoCopied ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
				>
					{demoCopied ? "✓ Copied!" : "Copy Demo URL"}
				</button>
			</div>

			<div className="w-full max-w-md">
				<input
					type="text"
					placeholder="Enter URL to shorten"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={handleShorten}
					className={`w-full text-white p-3 rounded font-medium transition-colors flex items-center justify-center gap-2 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
					disabled={loading}
				>
					{loading ? (
						<>
							<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							Processing...
						</>
					) : (
						"Shorten URL"
					)}
				</button>

				{shortUrl && (
					<div className="mt-6 p-4 border border-gray-300 rounded">
						<p className="text-lg mb-2">Shortened URL:</p>
						<div className="flex items-center justify-between">
							<a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">	{shortUrl}</a>
							<button
								onClick={handleCopy}
								className={`ml-4 px-3 py-1 rounded ${copied ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"} transition-colors`}
							>
								{copied ? "Copied!" : "Copy"}
							</button>
						</div>
						
						{qrImage && (
							<div className="mt-4">
								<p className="text-lg mb-2">QR Code:</p>
								<img src={qrImage} alt="QR Code" className="mx-auto" />
							</div>
						)}
						
						{qrImage && (<button
							onClick={() => {
								const link = document.createElement("a");
								link.href = qrImage;
								link.download = "qr-code.png";
								link.click();
							}}
							className="mt-3 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
						>
							Download QR Code
						</button>)}
						
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
