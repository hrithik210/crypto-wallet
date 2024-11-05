import Button from "./ui/Button";

 const RecoveryPhraseStep = ({ confirmed, setConfirmed }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-4xl font-bold tracking-tight">Secret Recovery Phrase</h2>
      <p className="text-lg text-muted-foreground">Save these words in a safe place.</p>
      <Button>
        Read the warnings again
      </Button>
    </div>
    <Card className="border-muted-foreground/20">
      <CardContent className="grid grid-cols-3 gap-4 p-6">
        {[
          "desk",
          "vessel",
          "sound",
          "fame",
          "resist",
          "winter",
          "receive",
          "garage",
          "hover",
          "blood",
          "alter",
          "invite",
        ].map((word, index) => (
          <div key={word} className="flex items-center gap-2">
            <span className="text-muted-foreground">{index + 1}</span>
            <span className="font-medium">{word}</span>
          </div>
        ))}
      </CardContent>
    </Card>
    <p className="text-center text-sm text-muted-foreground">Click anywhere on this card to copy</p>
    <div className="flex items-center gap-2">
      <input id="confirm" checked={confirmed} onClick={setConfirmed} />
      <label htmlFor="confirm" className="text-sm text-muted-foreground">
        I saved my secret recovery phrase
      </label>
    </div>
  </div>
)

export default RecoveryPhraseStep;