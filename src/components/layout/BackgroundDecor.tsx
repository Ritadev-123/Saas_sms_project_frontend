export const BackgroundDecor = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float"
                style={{ animationDelay: "2s" }}
            />
        </div>
    );
};
